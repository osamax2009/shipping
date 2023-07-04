@include('adminLTEcss')

<div class="px-8">
    <div class="d-flex flex-row w-100 justify-content-between font-weight-bold text-black">
        <div class="font-bold text-2xl text-primary text-uppercase">
            <h1>
                Invoice
            </h1>
        </div>
        <div class="text-end text-xl pb-6">
            <div class="font-bold ">
                Roberts Private Limited
            </div>
            <div>
                Sarah Street 9, Beijing, Ahmedabad
            </div>
            <div>
                +91 9845345665
            </div>
        </div>
    </div>
    <div class="d-flex flex-row justify-content-between">
        <div>
            <div class="text-primary">
                Customer Name
            </div>
            <div>
                {{ $order->client_name }}
            </div>
        </div>
        <div>
            <h3>
                Invoice No: {{ $order->id }}

            </h3>
            <h3>
                @php
                $date = new Date()
                @endphp

                Invoice Date: {{ Dat }}

            </h3>
            <h3>

                Ordered Date: 4/13/2023
            </h3>
        </div>
    </div>

</div>
