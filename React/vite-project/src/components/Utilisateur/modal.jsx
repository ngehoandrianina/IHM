import { useState } from "react"

export default function Modal({close}) {
    const [materiels, setMateriels] = useState({
        nom: 'projecteur',
        description: 'Remplacer circuit de charge.',
    })
    
    return(
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.2)] z-10 shadow-sm">
            <div className="bg-white absolute left-1/2  w-1/3 h-1/2 py-5 px-4 transform -translate-x-1/2 translate-y-1/2 rounded-lg">
                <button
                    className="font-bold text-gray-500 absolute right-2 top-1 cursor-pointer" 
                    onClick={close}>
                    x
                </button>
                <h1 className="text-center text-primary font-bold">Note de reparation</h1>
                <form action="">
                    <div className="mb-2 flex flex-col">
                        <label htmlFor="nomMateriels" className="text-gray-500 font-bold">Materiels</label>
                        <input 
                            type="text"
                            value={materiels.nom}
                            name="nom"
                            id="nomMateriels"
                            readOnly
                            className="w-full px-1 py-1 text-gray-500
                            border border-gray-200 rounded-sm focus:outline-none"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="description" className="text-gray-500 font-bold">Description</label>
                        <textarea
                            name="description"
                            id="description"
                            className="text-gray-600 border border-gray-200 p-1
                            rounded-sm focus:outline-none"
                        ></textarea>
                    </div>

                    <div className="flex justify-center gap-20 mt-10">
                        <button className="bg-gray-200 px-2 py-1 rounded-lg cursor-pointer">
                            Annuler
                        </button>
                        <button className="bg-primary px-2 py-1 rounded-lg text-white cursor-pointer">
                            Valider
                        </button>
                    </div>
                    
                </form>

            </div>
        </div>
    )
};


