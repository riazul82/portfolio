import React from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../Layouts/AppLayout';

const Dashboard = () => {
    return (
        <AppLayout>
            <div className="admin">
                <div className="adminTopbar">
                    <div className="adminTopbarLeft">
                        <Link to='/admin/project/upload' className="link adminTopbarLink">Upload New Project</Link>
                    </div>
                    <div className="adminTopbarRight">
                        <button>Logout</button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

export default Dashboard;