import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Case from "../../components/Case";
import UserAdd from "./Create";
import UserEdit from "./Edit";
import { Link } from "react-router-dom";

export default function User() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [isUserAddOpen, setIsUserAddOpen] = useState(false);
    const [isUserEditOpen, setIsUserEditOpen] = useState(false);

    const endpointModal = {
        "create_user": "http://localhost:8000/user/store",
        "update_user":"http://localhost:8000/user/update/{id}",
        "delete_user":"http://localhost:8000/user/delete/{id}",
    };

    const inputData = {
        "username": {
            "tag": "input",
            "type": "text",
            "option": null
        },
        "email": {
            "tag": "input",
            "type": "text",
            "option": null
        },
        "password": {
            "tag": "input",
            "type": "password",
            "option": null
        },"role": {
            "tag": "select",
            "type": "select",
            "option": ["admin", "staff"]
        },
    };

    const title = "User";

    useEffect(() => {
        axios.get("http://localhost:8000/user", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access_token"),
            }
        })
        .then(res => {
            setUsers(res.data.data);
        })
        .catch(err => {
            console.log(err);
            if (err.response && err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('anda belum login !!'));
            }
        });
    }, []);

    const handleUserAdd = () => {
        setIsUserAddOpen(true);
    };
    const handleUserEdit = () => {
        setIsUserEditOpen(true);
    };

    // const handleEdit = (id) => {
    //     navigate(/user/edit/${id});
    // };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            axios.delete( "delete_user", {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("access_token"),
                }
            })
            .then(res => {
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
                if (err.response && err.response.status === 401) {
                    navigate('/login?message=' + encodeURIComponent('anda belum login !!'));
                }
            });
        }
    };

    const styles = {
        container: {
            padding: '20px',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
        },
        th: {
            border: '1px solid #ddd',
            padding: '8px',
            textAlign: 'left',
            backgroundColor: '#4CAF50',
            color: 'white',
            paddingTop: '12px',
            paddingBottom: '12px',
        },
        td: {
            border: '1px solid #ddd',
            padding: '8px',
            textAlign: 'left',
        },
        trEven: {
            backgroundColor: '#f9f9f9',
        },
        trHover: {
            backgroundColor: '#ddd',
        },
        tr: { backgroundColor: 'white' },
        button: {
            marginRight: '5px',
            padding: '5px 10px',
            borderRadius: '4px',
            cursor: 'pointer',
        },
        editButton: {
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
        },
        deleteButton: {
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
        },
    };

    return (
        <Case>
            <div style={styles.container}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>#</th>
                            <th style={styles.th}>Username</th>
                            <th style={styles.th}>Email</th>
                            <th style={styles.th}>Role</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id} style={index % 2 === 0 ? styles.trEven : styles.tr}>
                                <td style={styles.td}>{index + 1}</td>
                                <td style={styles.td}>{user.username}</td>
                                <td style={styles.td}>{user.email}</td>
                                <td style={styles.td}>{user.role}</td>
                                <td style={styles.td}>
                                    <button
                                        style={{ ...styles.button, ...styles.editButton }}
                                        onClick={() => handleUserEdit(user.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        style={{ ...styles.button, ...styles.deleteButton }}
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <>
                <UserAdd 
                    isOpen={isUserAddOpen} 
                    onClose={() => setIsUserAddOpen(false)} 
                    endpoint={endpointModal} 
                    inputData={inputData} 
                    titleModal={title} 
                />
                <UserEdit 
                    isOpen={isUserEditOpen} 
                    onClose={() => setIsUserEditOpen(false)} 
                    endpoint={endpointModal} 
                    inputData={inputData} 
                    titleModal={title} 
                />
                <Link to={'/user/trash'} className="inline-flex items-center px-4 py-2 text-sm ml-3 font-medium
                    text-center text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none 
                    focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800
                    mb-5">Trash</Link>
                <button type="button" onClick={handleUserAdd} className="inline-flex items-center px-4 py-2 text-sm
                    font-medium text-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none
                    focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mb-5">Create</button>
            </>
        </Case>
    );
}