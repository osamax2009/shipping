<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>

    @include('adminLTEcss')
</head>
<body>
    <footer class="fixed-bottom" style="bottom:-55px">
        <div class="align-self-end">
            <div class="container">
                <div class="border-top">
                    <p class="text-center">
                        <span class="font-weight-bold">
                            Address
                        </span>
                        <span>
                            {{ $appSettings->site_address}}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    </footer>
    <main>
        <div class="d-flex flex-column  ">
            <div class="align-self-start ">
                <div class="container-fluid font-mono ">
                    <div class=" row">
                        <table class="table table-borderless">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div class=" font-bold text-2xl text-primary text-uppercase font-weight-bold">
                                            <h1>
                                                Invoice
                                            </h1>
                                        </div>
                                    </td>
                                    <td>
                                        {{ " " }}
                                    </td>
                                    <td>
                                        {{ " " }}
                                    </td>
                                    <td>
                                        <div class="text-right">
                                            <h5 class=" font-weight-bold pb-1  ">
                                                {{ $appSettings->site_name}}
                                            </h5>
                                            <h6>
                                                {{ $appSettings->site_address}}

                                            </h6>
                                            <h6>
                                                {{ $appSettings->support_number}}
                                            </h6>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                    <div class="row mt-3">
                        <table class="table table-borderless">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th></th>

                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div class="">
                                            <div>
                                                <p>
                                                    <span class="text-primary">
                                                        Customer Name
                                                    </span>
                                                    <br>
                                                    <span>
                                                        {{ $client->name }}
                                                    </span>
                                                </p>
                                            </div>

                                            <div class="mt-1">
                                                <p>
                                                    <span class="text-primary">
                                                        Delivered To
                                                    </span>
                                                    <br>
                                                    <span>
                                                        {{ $order->delivery_point["address"] }}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td> {{" "}} </td>
                                    <td>
                                        <div class="">
                                            <span>
                                                Invoice No: {{ $order->id }}
                                            </span>
                                            <span class="d-flex">
                                                @php
                                                $invoice_date = new DateTime()
                                                @endphp

                                                Invoice Date: {{ $invoice_date->format('d/m/Y') }}

                                            </span>
                                            <span>
                                                @php
                                                $order_date = new DateTime($order->date)
                                                @endphp
                                                Ordered Date: {{ $order_date->format('d/m/Y') }}
                                            </span>
                                        </div>

                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>



                    <div class="row mt-4">
                        <table class="table table-borderless">
                            <thead class="thead-light">
                                <tr>
                                    <th>
                                        <p class="font-weight-bold">
                                            Product
                                        </p>
                                    </th>
                                    <th>
                                        <p class="font-weight-bold">
                                            Description
                                        </p>
                                    </th>
                                    <th>
                                        <p class="font-weight-bold">
                                            Price
                                        </p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <span>
                                            @php
                                            $value = Str::replace("_" , " " , $order->parcel_type);
                                            $parcel_type = Str::title($value)
                                            @endphp
                                            {{ $parcel_type }} ({{ $order->total_weight }} {{ $appSettings->weight }})
                                        </span>
                                    </td>
                                    <td>
                                        <span>
                                            Delivery charges
                                        </span>
                                    </td>

                                    <td>
                                        <span>
                                            {{ $order->fixed_charges }} {{ $appSettings->currency }}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span>

                                        </span>
                                    </td>

                                    <td>
                                        <span>
                                            Distance Charge
                                        </span>
                                    </td>

                                    <td>
                                        <span>
                                            {{ $order->distance_charge }} {{ $appSettings->currency }}
                                        </span>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <span>

                                        </span>
                                    </td>

                                    <td>
                                        <span>
                                            Weight Charge
                                        </span>
                                    </td>

                                    <td>
                                        <span>
                                            {{ $order->weight_charge }} {{ $appSettings->currency }}
                                        </span>
                                    </td>
                                </tr>

                                <tr class="border-top">
                                    <td>
                                        <span>

                                        </span>
                                    </td>

                                    <td>
                                        <span class="font-weight-bold">
                                            Sub total
                                        </span>
                                    </td>

                                    <td>
                                        <span>
                                            {{ $order->fixed_charges + $order->distance_charge + $order->weight_charge }} {{ $appSettings->currency }}
                                        </span>
                                    </td>
                                </tr>

                                @foreach ($order->extra_charges as $extra )
                                <tr class="">
                                    <td>
                                        <span>

                                        </span>
                                    </td>

                                    <td>
                                        <span class="">
                                           {{ $extra["title"] }}
                                        </span>
                                    </td>

                                    <td>
                                        <span>
                                            {{ $extra["value"] }} {{ $appSettings->currency }}
                                        </span>
                                    </td>
                                </tr>
                                @endforeach
                                <tr>
                                    <td></td>
                                    <td class="border-top"></td>
                                    <td class="border-top"></td>
                                </tr>

                                <tr >
                                    <td>
                                        <span>

                                        </span>
                                    </td>

                                    <td class="border-top">
                                        <span class="font-weight-bold">
                                            Total
                                        </span>
                                    </td>

                                    <td class="border-top">
                                        <span>
                                            {{ $order->total_amount }} {{ $appSettings->currency }}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>

                </div>
            </div>

        </div>
    </main>
</body>
</html>
