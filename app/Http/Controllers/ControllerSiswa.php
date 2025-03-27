<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ControllerSiswa extends Controller
{
    public function index(Request $request)
    {
        $siswa = Siswa::where('id_user', $request->user()->id)->first();
        
        return Inertia::render('siswa/siswaprofil', [
            'siswa' => $siswa
        ]);
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
        ], [
            'nik.required' => 'NIK wajib diisi',
            'nik.size' => 'NIK harus 16 digit',
            'nik.unique' => 'NIK sudah terdaftar',
            'nama.required' => 'Nama wajib diisi',
            'alamat.required' => 'Alamat wajib diisi',
            'tempat_lahir.required' => 'Tempat lahir wajib diisi',
            'tanggal_lahir.required' => 'Tanggal lahir wajib diisi',
            'jenis_kelamin.required' => 'Jenis kelamin wajib diisi',
            'foto.required' => 'Foto wajib diupload',
            'foto.image' => 'File harus berupa gambar',
            'foto.mimes' => 'Format foto harus jpeg, png, atau jpg',
            'foto.max' => 'Ukuran foto maksimal 2MB',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            // Upload foto
            $foto = $request->file('foto');
            $fotoPath = $foto->store('foto_siswa', 'public');
            $fotoUrl = '/storage/' . $fotoPath;

            // Simpan data siswa
            $siswa = Siswa::create([
                'nik' => $request->nik,
                'id_user' => $request->user()->getKey(),
                'nama' => $request->nama,
                'alamat' => $request->alamat,
                'tempat_lahir' => $request->tempat_lahir,
                'tanggal_lahir' => $request->tanggal_lahir,
                'jenis_kelamin' => $request->jenis_kelamin,
                'kota' => $request->kota,
                'kecamatan' => $request->kecamatan,
                'kelurahan' => $request->kelurahan,
                'provinsi' => $request->provinsi,
                'agama' => $request->agama,
                'no_hp' => $request->no_hp,
                'asal_sekolah' => $request->asal_sekolah,
                'tahun_lulus' => $request->tahun_lulus,
                'program_studi' => $request->program_studi,
                'foto' => $fotoUrl,
                'beasiswa' => $request->beasiswa,
                'kelas' => $request->kelas,
            ]);

            return redirect()->route('siswa.profile')
                ->with('message', 'Data berhasil disimpan');

        } catch (\Exception $e) {
            if (isset($fotoPath)) {
                Storage::disk('public')->delete($fotoPath);
            }
            return back()->withErrors([
                'error' => 'Terjadi kesalahan saat menyimpan data'
            ]);
        }
    }
}
