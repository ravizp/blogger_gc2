import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function FormCategory({url, handleSubmit, category, nameProp}) {
    const [name, setName] = useState("");

    useEffect(() => {
        if(category){
            setName(category.name);
        }
    }, [category]);

    return (
        <>
            <div className="card w-full shadow-lg bg-base-100">
                <div className="card-body">
                    <h2 className="card-title text-accent">Make a new category or change </h2>
                    <form onSubmit={(e) => handleSubmit(e, name)}>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="text-base label-text">Name</span>
                                </label>
                                <input 
                                    onChange={(e) => setName(e.target.value)} 
                                    type="text"
                                    placeholder="Enter category name" 
                                    className="w-full input input-bordered input-primary"
                                    value={name}
                                />
                            </div>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary w-full">
                                {nameProp}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
