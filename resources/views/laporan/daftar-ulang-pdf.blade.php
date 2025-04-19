<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laporan Daftar Ulang</title>
    <style>
        body { font-family: Arial, sans-serif; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <h1>Laporan Daftar Ulang</h1>
    <p>Periode: {{ $tanggalAwal }} - {{ $tanggalAkhir }}</p>
    <p>Status: {{ $status }}</p>
    <p>Program Studi: {{ $program_studi }}</p>
    <p>Total Siswa: {{ $totalSiswa }} orang</p>

    <table>
        <thead>
            <tr>
                <th>Nama Siswa</th>
                <th>Kode Pembayaran</th>
                <th>Program Studi</th>
                <th>Status</th>
                <th>Tanggal</th>
            </tr>
        </thead>
        <tbody>
            @foreach($daftarUlang as $item)
            <tr>
                <td>{{ $item->siswa->nama }}</td>
                <td>{{ $item->kode_pembayaran }}</td>
                <td>
                    @switch($item->siswa->program_studi)
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
                            {{ $item->siswa->program_studi }}
                    @endswitch
                </td>
                <td>{{ ucfirst($item->status) }}</td>
                <td>{{ \Carbon\Carbon::parse($item->created_at)->format('d/m/Y') }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html> 