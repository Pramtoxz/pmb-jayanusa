<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Models\Pembayaran;
use Illuminate\Support\Facades\DB;

class CalonMahasiswaController extends Controller
{
    public function index()
    {
        $calonMahasiswa = Siswa::with(['user', 'pembayaran'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($siswa) {
                return [
                    'id' => $siswa->nik,
                    'nama' => $siswa->nama,
                    'nik' => $siswa->nik,
                    'program_studi' => match($siswa->program_studi) {
                        'MI' => 'D3-Manajemen Informatika',
                        'SI' => 'S1-Sistem Informasi',
                        'SK' => 'S1-Sistem Komputer',
                        default => $siswa->program_studi,
                    },
                    'kelas' => $siswa->kelas,
                    'beasiswa' => $siswa->beasiswa,
                    'status_pembayaran' => $siswa->pembayaran->first()?->status ?? 'belum ada',
                    'suratlulus' => $siswa->pembayaran->first()?->suratlulus,
                    'created_at' => $siswa->created_at->format('d M Y'),
                ];
            });

        return Inertia::render('CalonMahasiswa/index', [
            'calonMahasiswa' => $calonMahasiswa
        ]);
    }

    public function show(Siswa $calonMahasiswa)
    {
        $calonMahasiswa->load(['user', 'pembayaran']);
        
        return Inertia::render('CalonMahasiswa/Show', [
            'calonMahasiswa' => [
                'nik' => $calonMahasiswa->nik,
                'nama' => $calonMahasiswa->nama,
                'email' => $calonMahasiswa->user->email,
                'alamat' => $calonMahasiswa->alamat,
                'tempat_lahir' => $calonMahasiswa->tempat_lahir,
                'tanggal_lahir' => $calonMahasiswa->tanggal_lahir,
                'jenis_kelamin' => $calonMahasiswa->jenis_kelamin,
                'kota' => $calonMahasiswa->kota,
                'kecamatan' => $calonMahasiswa->kecamatan,
                'kelurahan' => $calonMahasiswa->kelurahan,
                'provinsi' => $calonMahasiswa->provinsi,
                'agama' => $calonMahasiswa->agama,
                'no_hp' => $calonMahasiswa->no_hp,
                'asal_sekolah' => $calonMahasiswa->asal_sekolah,
                'tahun_lulus' => $calonMahasiswa->tahun_lulus,
                'foto' => $calonMahasiswa->foto,
                'program_studi' => $calonMahasiswa->program_studi,
                'beasiswa' => $calonMahasiswa->beasiswa,
                'kelas' => $calonMahasiswa->kelas,
                'pembayaran' => $calonMahasiswa->pembayaran->map(fn($p) => [
                    'kode' => $p->kode_pembayaran,
                    'jumlah' => $p->jumlah,
                    'status' => $p->status,
                    'bukti' => $p->bukti_pembayaran,
                    'skl' => $p->skl,
                    'rapor' => $p->rapor,
                    'suratlulus' => $p->suratlulus,
                    'keterangan' => $p->keterangan,
                    'tanggal' => $p->created_at->format('d M Y'),
                ])
            ]
        ]);
    }

    public function edit(Siswa $calonMahasiswa)
    {
        return Inertia::render('CalonMahasiswa/Edit', [
            'calonMahasiswa' => $calonMahasiswa->load('user')
        ]);
    }

    public function update(Request $request, Siswa $calonMahasiswa)
    {
        $validator = Validator::make($request->all(), [
            'nik' => 'required|string|size:16|unique:siswa,nik,' . $calonMahasiswa->nik . ',nik',
            'nama' => 'required|string|max:255',
            'alamat' => 'required|string',
            'tempat_lahir' => 'required|string',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|in:L,P',
            'kota' => 'required|string',
            'kecamatan' => 'required|string',
            'kelurahan' => 'required|string',
            'provinsi' => 'required|string',
            'agama' => 'required|string',
            'no_hp' => 'required|string',
            'asal_sekolah' => 'required|string',
            'tahun_lulus' => 'required|string',
            'program_studi' => 'required|in:MI,SI,SK',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'beasiswa' => 'required|in:iya,tidak',
            'kelas' => 'required_if:beasiswa,tidak|in:reguler,kerja',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            DB::beginTransaction();

            $data = $request->except('foto');
            if ($request->hasFile('foto')) {
                $foto = $request->file('foto');
                $fotoPath = $foto->store('foto_siswa', 'public');
                $data['foto'] = '/storage/' . $fotoPath;
                if ($calonMahasiswa->foto) {
                    Storage::disk('public')->delete(str_replace('/storage/', '', $calonMahasiswa->foto));
                }
            }

            $calonMahasiswa->update($data);

            DB::commit();
            return redirect()->route('calon-mahasiswa.index')
                ->with('message', 'Data calon mahasiswa berhasil diperbarui');

        } catch (\Exception $e) {
            DB::rollBack();
            if (isset($fotoPath)) {
                Storage::disk('public')->delete($fotoPath);
            }
            return response()->json(['error' => 'Terjadi kesalahan saat memperbarui data: ' . $e->getMessage()], 500);
        }
    }

    public function destroy(Siswa $calonMahasiswa)
    {
        if ($calonMahasiswa->foto) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $calonMahasiswa->foto));
        }

        $calonMahasiswa->user()->delete(); // This will cascade delete siswa record
        
        return redirect()->route('calon-mahasiswa.index')
            ->with('message', 'Data calon mahasiswa berhasil dihapus');
    }

    public function create()
    {
        return Inertia::render('CalonMahasiswa/Create');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nik' => 'required|string|size:16|unique:siswa,nik',
            'nama' => 'required|string|max:255',
            'alamat' => 'required|string',
            'tempat_lahir' => 'required|string',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|in:L,P',
            'kota' => 'required|string',
            'kecamatan' => 'required|string',
            'kelurahan' => 'required|string',
            'provinsi' => 'required|string',
            'agama' => 'required|string',
            'no_hp' => 'required|string',
            'asal_sekolah' => 'required|string',
            'tahun_lulus' => 'required|string',
            'program_studi' => 'required|in:MI,SI,SK',
            'foto' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'beasiswa' => 'required|in:iya,tidak',
            'kelas' => 'required_if:beasiswa,tidak|in:reguler,kerja',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        try {
            DB::beginTransaction();
            $user = User::create([
                'name' => $request->nama,
                'email' => $request->nik . '@jayanusa.ac.id',
                'password' => bcrypt($request->nik),
                'role' => 'user'
            ]);

            $data = $request->except('foto');
            $data['id_user'] = $user->id;

            if ($request->hasFile('foto')) {
                $foto = $request->file('foto');
                $fotoPath = $foto->store('foto_siswa', 'public');
                $data['foto'] = '/storage/' . $fotoPath;
            }

            $siswa = Siswa::create($data);

            Pembayaran::create([
                'kode_pembayaran' => 'PMB-' . date('Y') . '-' . str_pad(rand(1, 999), 3, '0', STR_PAD_LEFT),
                'jumlah' => 200000,
                'status' => 'menunggu',
                'nik_siswa' => $request->nik,
                'keterangan' => 'Biaya Pendaftaran Mahasiswa Baru'
            ]);

            DB::commit();

            return redirect()->route('calon-mahasiswa.index')
                ->with('message', 'Data calon mahasiswa berhasil ditambahkan');

        } catch (\Exception $e) {
            DB::rollBack();
            if (isset($fotoPath)) {
                Storage::disk('public')->delete($fotoPath);
            }
            
            return back()
                ->withErrors(['error' => 'Terjadi kesalahan saat menyimpan data: ' . $e->getMessage()])
                ->withInput();
        }
    }
} 