import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateUser from './CreateUser'; 
import ChangePassword from './ChangePassword'; 
import ChangeEmail from './ChangeEmail'; 
import RemoveUser from './RemoveUser';

const Admins = () => {
    const [admins, setAdmins] = useState([]);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isChangeEmailOpen, setChangeEmailOpen] = useState(false); 
    const [isChangePasswordOpen, setChangePasswordOpen] = useState(false);
    const [isRemoveUserOpen, setRemoveUserOpen] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;
        const fetchAdmins = async () => {
            try {
                const adminRes = await axios.get('https://localhost:7146/api/Admin/Admins');
                setAdmins(adminRes.data.data || []);
            } catch (error) {
                console.error('Adminlərin alınmasında səhv:', error);
            }
        };
        fetchAdmins();
    }, []);

    const togglePopup = () => setPopupOpen(!isPopupOpen);
    const toggleChangeEmail = () => setChangeEmailOpen(!isChangeEmailOpen); 
    const toggleChangePassword = () => setChangePasswordOpen(!isChangePasswordOpen);
    const toggleRemoveUser = () => setRemoveUserOpen(!isRemoveUserOpen);

    return (
        <div className="more_one">
            <div className="more_one_all">
                <div className="more_one_name">
                    <h2>Adminlər</h2>
                </div>
                <button className="more_one_name_btn" onClick={togglePopup}>
                    <p>Istifadəçi yarat</p>
                    <i className="fa-solid fa-user-plus"></i>
                </button>
            </div>

            {isPopupOpen && <CreateUser onClose={togglePopup} />}
            {isChangeEmailOpen && <ChangeEmail onClose={toggleChangeEmail} userId={currentUserId} />} 
            {isChangePasswordOpen && <ChangePassword onClose={toggleChangePassword} userId={currentUserId} />}
            {isRemoveUserOpen && <RemoveUser onClose={toggleRemoveUser} userId={currentUserId} />}

            <table>
                <thead>
                    <tr>
                        <th className="tr_task">İstifadəçi Adı</th>
                        <th className="tr_owner">İstifadəçi E-poçtu</th>
                        <th className="tr_status">E-poçtu Dəyiş</th>
                        <th className="tr_psw">Şifrəni Dəyiş</th>
                        <th className="tr_dlt">Sil</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map(admin => (
                        <tr key={admin.id}>
                            <td className="tr_task">{admin.userName}</td>
                            <td className="tr_owner">{admin.email}</td>
                            <td className="tr_status">
                                <button onClick={() => { setCurrentUserId(admin.id); toggleChangeEmail(); }}>
                                    E-poçtu Dəyiş
                                </button>
                            </td>
                            <td className="tr_psw">
                                <button onClick={() => { setCurrentUserId(admin.id); toggleChangePassword(); }}>Şifrəni Dəyiş</button>
                            </td>
                            <td className="tr_dlt">
                                <i className="fa-regular fa-trash-can delete-icon" onClick={() => { setCurrentUserId(admin.id); toggleRemoveUser(); }}></i>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Admins;
