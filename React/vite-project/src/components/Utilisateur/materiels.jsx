
export default function Materiels(){
    return(
        <div>
           <div class="overflow-hidden dark:bg-black p-2 bg-white rounded-2xl shadow-sm ">
                <table class="min-w-full rounded-xl dark:bg-black">
                    <thead>
                        <tr class="bg-white border-b-4">
                            <th scope="col" class="p-3  text-left text-lg leading-6 font-semibold capitalize rounded-tl-xl"> ID </th>
                            <th scope="col" class="p-3 text-left text-lg leading-6 font-semibold  capitalize">Nom </th>
                            <th scope="col" class="p-3 text-left text-lg leading-6 font-semibold  capitalize"> Type </th>
                            <th scope="col" class="p-3 text-left text-lg leading-6 font-semibold  capitalize"> Marque</th>
                            <th scope="col" class="p-3 text-left text-lg leading-6 font-semibold  capitalize"> Model</th>
                            <th scope="col" class="p-3 text-left text-lg leading-6 font-semibold  capitalize"> Numero de Serie</th>
                            <th scope="col" class="p-3 text-left text-lg leading-6 font-semibold  capitalize"> Etat</th>
                            <th scope="col" class="p-3 text-left text-lg leading-6 font-semibold  capitalize"> Date Aquisition</th>
                            <th scope="col" class="p-3 text-left text-lg leading-6 font-semibold  capitalize"> Salle</th>
                            <th scope="col" class="p-3 text-left text-lg leading-6 font-semibold  capitalize"> Departemet</th>
                            <th scope="col" class="p-3 text-left text-lg leading-6 font-semibold  capitalize rounded-tr-xl"> Actions </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-300 ">
                    </tbody>
                </table>
            </div>
        </div>
    );
}