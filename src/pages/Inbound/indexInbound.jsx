import React, { useEffect, useState } from "react";
import Case from "../../components/Case";
import axios from "axios";
import Table from "../../components/Table";
import { Link ,useNavigate } from "react-router-dom";


export default function IndexInbound( ) {
    const [inbound, setInbound] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/inbound", {
            headers: {  
                "Authorization": "Bearer " + localStorage.getItem("access_token"),
            }
        })
        .then(res => {
            setInbound(res.data.data);
        })
        .catch(err => {
            console.log(err);
            if (err.response && err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login !!'));
            }
        })
    }, []);

    const headers = [
        "#",
        "date",
        "stuff_id",
        "total",
        "proff_file"
    ];
    
    const endpointModal = {
        "createInbound": "http://localhost:5173/inbound/create",
        "InboundDelete":"http://localhost:8000/inbound/delete/{id}",
        "InboundDetail":"http://localhost:8000/inbound/{id}"
    };

  
    const title = "Inbound";

    const columnIdentitasDelete = 'stuff_id'; // Adjust according to your data

    const buttons = [
        "createInbound",
        "InboundDelete",
        "InboundDetail"
    ];

    const tdColumn = {
        "date": null,
        "stuff_id": null,
        "total": null,
        "proff_file": null
    };

    const UrlImage = "http://localhost:8000/upload-images"

    return (

        <Case>
            <div className="relative overflow-x-auto shadow-md px-20 py-10">
                <div className="flex justify-end">
                        <Link to="/inbound-stuff" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mb-5 rounded-lg">Tambah +</Link>  
                </div>
    </div>
            <Table headers={headers} data={inbound} endpoint={endpointModal}  titleModal={title}
                identitasColumn={columnIdentitasDelete} opsiButton={buttons} columnForTd={tdColumn}>
            </Table>
        </Case>
        
    );
}