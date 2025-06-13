<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $query = User::with('siswa')
            ->when($search, function($query) use ($search) {
                $query->where(function($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhereHas('siswa', function($query) use ($search) {
                            $query->where('nik', 'like', "%{$search}%")
                                ->orWhere('nama', 'like', "%{$search}%");
                        });
                });
            })
            ->orderBy('created_at', 'desc');
            
        $users = $query->get()->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'nik' => $user->siswa ? $user->siswa->nik : null,
                'created_at' => $user->created_at->format('d M Y'),
            ];
        });

        return Inertia::render('Users/Index', [
            'users' => $users,
            'filters' => [
                'search' => $search,
            ]
        ]);
    }

    public function show(User $user)
    {
        $user->load('siswa');
        
        return Inertia::render('Users/Show', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'created_at' => $user->created_at->format('d M Y'),
                'siswa' => $user->siswa ? [
                    'nik' => $user->siswa->nik,
                    'nama' => $user->siswa->nama,
                    'program_studi' => $user->siswa->program_studi,
                ] : null
            ]
        ]);
    }

    public function edit(User $user)
    {
        return Inertia::render('Users/Edit', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ]
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'role' => 'required|in:admin,user',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        try {
            DB::beginTransaction();

            $user->update([
                'name' => $request->name,
                'email' => $request->email,
                'role' => $request->role,
            ]);

            DB::commit();
            return redirect()->route('users.index')
                ->with('message', 'Data pengguna berhasil diperbarui');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()
                ->withErrors(['error' => 'Terjadi kesalahan saat memperbarui data: ' . $e->getMessage()])
                ->withInput();
        }
    }

    public function resetPassword(Request $request, User $user)
    {
        $validator = Validator::make($request->all(), [
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        try {
            $user->update([
                'password' => Hash::make($request->password)
            ]);

            return redirect()->route('users.show', $user->id)
                ->with('message', 'Password berhasil direset');
                
        } catch (\Exception $e) {
            return back()
                ->withErrors(['error' => 'Terjadi kesalahan saat mereset password: ' . $e->getMessage()]);
        }
    }
} 