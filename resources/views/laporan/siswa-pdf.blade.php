<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laporan Calon Mahasiswa</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .subtitle {
            text-align: center;
            margin-bottom: 30px;
            color: #666;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        .summary {
            margin-top: 20px;
            padding: 10px;
            background-color: #f9f9f9;
            border: 1px solid #ddd;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Laporan Calon Mahasiswa STMIK-AMIK JAYANUSA</h1>
        <div class="subtitle">
            <p>Periode: {{ $tanggalAwal }} s/d {{ $tanggalAkhir }}</p>
            <p>Kelas: {{ $kelas }}</p>
            <p>Program Studi: {{ $program_studi }}</p>
        </div>
    </div>

    <table>
        <thead>
            <tr>
                <th>NIK</th>
                <th>Nama</th>
                <th>Program Studi</th>
                <th>Kelas</th>
                <th>Beasiswa</th>
                <th>Status Pembayaran</th>
                <th>Tanggal Daftar</th>
            </tr>
        </thead>
        <tbody>
            @foreach($siswa as $item)
                <tr>
                    <td>{{ $item->nik }}</td>
                    <td>{{ $item->nama }}</td>
                    <td>
                        @switch($item->program_studi)
                            @case('MI')
                                D3-Manajemen Informatika
                                @break
                            @case('SI')
                                S1-Sistem Informasi
                                @break
                            @case('SK')
                                S1-Sistem Komputer
                                @break
                            @default
                                {{ $item->program_studi }}
                        @endswitch
                    </td>
                    <td>{{ ucfirst($item->kelas) }}</td>
                    <td>{{ ucfirst($item->beasiswa) }}</td>
                    <td>{{ ucfirst($item->pembayaran->first()?->status ?? 'belum ada') }}</td>
                    <td>{{ $item->created_at->format('d/m/Y') }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <div class="summary">
        <p>Total Siswa: {{ $siswa->count() }} orang</p>
    </div>
</body>
</html> 