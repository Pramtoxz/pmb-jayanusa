<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laporan Pembayaran</title>
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
        .status-badge {
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
        }
        .status-dibayar {
            background-color: #d4edda;
            color: #155724;
        }
        .status-menunggu {
            background-color: #fff3cd;
            color: #856404;
        }
        .status-ditolak {
            background-color: #f8d7da;
            color: #721c24;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>LAPORAN PEMBAYARAN</h1>
        <div class="subtitle">
            <p>Periode: {{ $tanggalAwal }} s/d {{ $tanggalAkhir }}</p>
            <p>Status: {{ $status }}</p>
            <p>Program Studi: {{ $program_studi }}</p>
        </div>
    </div>

    <table>
        <thead>
            <tr>
                <th>Nama Siswa</th>
                <th>Program Studi</th>
                <th>Kode Pembayaran</th>
                <th>Jumlah</th>
                <th>Status</th>
                <th>Tanggal</th>
            </tr>
        </thead>
        <tbody>
            @foreach($pembayaran as $item)
                <tr>
                    <td>{{ $item->siswa->nama }}</td>
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
                    <td>{{ $item->kode_pembayaran }}</td>
                    <td>Rp {{ number_format($item->jumlah, 0, ',', '.') }}</td>
                    <td>
                        <span class="status-badge status-{{ $item->status }}">
                            {{ ucfirst($item->status) }}
                        </span>
                    </td>
                    <td>{{ $item->created_at->format('d/m/Y') }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <div class="summary">
        <p>Total Pembayaran: Rp {{ number_format($total, 0, ',', '.') }}</p>
        <p>Total Siswa: {{ $totalSiswa }} orang</p>
        @if($totalSiswa > 0)
            <p><strong>Rata-rata Pembayaran per Siswa:</strong> Rp {{ number_format($total / $totalSiswa, 0, ',', '.') }}</p>
        @endif
    </div>
</body>
</html> 