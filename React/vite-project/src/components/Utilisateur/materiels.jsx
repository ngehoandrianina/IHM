
export default function Materiels(){

    return(
        <div className="overflow-x-auto w-full">
            <div className="flex justify-between mb-5">
                <h1 className="text-md text-gray-500">Materiels disponnible </h1>
            </div>
            <table className="w-full">
                <thead className="border-b-1">
                    <tr className="">
                        <th className="text-left">Matriels</th>
                        <th className="text-left">Etat</th>
                        <th className="text-left">Description</th>
                        <th className="text-left">Date signalement</th>
                        <th className="text-left">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td className="">Projecteur</td>
                        <td>en panne</td>
                        <td>Non difussion image</td>
                        <td>03-05-2024</td>
                        <td>
                            <button className="bg-primary rounded-lg px-2 py-1
                             text-sm font-bold text-white cursor-pointer ">
                                Reparer
                            </button>
                        </td>
                    </tr>
                </tbody>
                </table>
        </div>
    );
}