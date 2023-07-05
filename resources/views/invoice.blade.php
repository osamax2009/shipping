@include('adminLTEcss')

<div class="w-full">
    <div class=" container-fluid">
        <table>
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
                        <div class="">
                            <h5 class=" font-weight-bold pb-2 ">
                                Roberts Private Limited
                            </h5>
                            <h5>
                                Sarah Street 9, Beijing, Ahmedabad
                            </h5>
                            <h5>
                                +91 9845345665
                            </h5>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>


    <div class="container-fluid mt-5">
        <table>
            <tbody>
                <tr>
                    <td>
                        <div class="">
                            <div>
                                <p class="text-primary">
                                    Customer Name
                                </p>
                                <p>
                                    {{ $client->name }}
                                </p>
                            </div>

                            <div class="mt-5">
                                <p class="text-primary">
                                    Delivered To
                                </p>
                                <p>
                                    {{ $order->delivery_point["address"] }}
                                </p>
                            </div>
                        </div>
                    </td>
                    <td></td>
                    <td>
                        <div class="">
                            <p>
                                Invoice No: {{ $order->id }}
                            </p>
                            <p>
                                @php
                                $invoice_date = new DateTime()
                                @endphp

                                Invoice Date: {{ $invoice_date->format('d/m/Y') }}

                            </p>
                            <p>
                                @php
                                $order_date = new DateTime($order->date)
                                @endphp
                                Ordered Date: {{ $order_date->format('d/m/Y') }}
                            </p>
                        </div>

                    </td>
                </tr>
            </tbody>
        </table>
    </div>



    <div class="container-fluid mt-5">
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>
                        <h5 class="font-weight-bold">
                            Product
                        </h5>
                    </th>
                    <th>
                        <h5 class="font-weight-bold">
                            Description
                        </h5>
                    </th>
                    <th>
                        <h5 class="font-weight-bold">
                            Price
                        </h5>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <h5>
                            {{ $order->parcel_type }} ({{ $order->total_weight }})
                        </h5>
                    </td>
                    <td>
                        <h5>
                            Delivery charges ({{ $order->total_weight }})
                        </h5>
                    </td>

                    <td>
                        <h5>
                            ({{ $order->total_weight }})
                        </h5>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>

</div>
