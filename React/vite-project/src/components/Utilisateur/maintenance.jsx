import { useState } from "react";
import Modal from "./modal";

export default function Maintenance(){

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () =>{
        setIsOpen(!isOpen);
    }

    return(
        <div className="overflow-x-auto w-full">
            <div className="flex justify-between mb-5">
                <h1 className="text-lg font-500 text-gray-500">Reparer materiels</h1>
            </div>
            <table className="w-full">
                <thead className="border-b-1 mb-10">
                    <tr className="">
                        <th className="text-left">Matriels</th>
                        <th className="text-left">Etat</th>
                        <th className="text-left">Description</th>
                        <th className="text-left">Date signalement</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="">
                        <td className="">Projecteur</td>
                        <td>en maintenance</td>
                        <td>Non difussion image</td>
                        <td>03-05-2024</td>
                        <td className="text-center">
                            <button className="bg-primary rounded-lg px-2 py-1
                             text-sm font-bold text-white cursor-pointer "
                             onClick={() => {openModal();}}
                             >
                                note reparation
                            </button>
                        </td>
                    </tr>
                </tbody>
                </table>
                {
                    isOpen ? <Modal close={openModal} /> : null
                }
        </div>

    );
}