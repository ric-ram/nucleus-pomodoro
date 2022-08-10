import { ReactComponent as CautionIcon } from '../../../icons/cautionIcon.svg';
import { ReactComponent as CloseIcon } from '../../../icons/closeIcon.svg';
import { ReactComponent as InfoIcon } from '../../../icons/infoIcon.svg';
import React from 'react'
import { SettingContext } from './../../../context/SettingsContext';
import { useContext } from 'react';

const ProfilePopUp = ({ toDelete, open, setOpen }) => {
    const { resetPassword, deleteUser, logout } = useContext(SettingContext);

    const handleClose = () => {
        setOpen(!open);
    }

    const handleSubmitReset = (e) => {
        e.preventDefault();
        resetPassword();
        setOpen(!open);
    }

    const handleSubmitDelete = (e) => {
        e.preventDefault();
        deleteUser();
        logout();
        setOpen(!open);
    }


    return (open && !toDelete) ? (
        <div className='popup'>
            <form className='popup-placeholder' onSubmit={handleSubmitReset}>
                <div className='warning-grid'>
                    <div className='info-icon'>{<InfoIcon />}</div>
                    <h3>Do you want to set a new password?</h3>
                    <p className='profile-info'>A link will be sent to your email to set up a new password.</p>
                </div>
                <button type='button' className='close-button' onClick={handleClose}>{<CloseIcon />}</button>
                <div className='btn-placeholder'>
                    <button type='button' className='sqr-btn cancel-btn' onClick={handleClose}>Cancel</button>
                    <button type='submit' className='sqr-btn ok-btn' >OK</button>
                </div>
            </form>
        </div>
    ) : (open && toDelete) ? (
        <div className='popup' onSubmit={handleSubmitDelete}>
            <form className='popup-placeholder'>
                <div className='warning-grid'>
                    <div className='caution-icon'>{<CautionIcon />}</div>
                    <h3>Are you sure?</h3>
                    <p className='profile-info'>Your data will be erased permanently.<br></br>This action cannot be undone. </p>
                </div>
                <button type='button' className='close-button' onClick={handleClose}>{<CloseIcon />}</button>
                <div className='btn-placeholder'>
                    <button type='button' className='sqr-btn cancel-btn' onClick={handleClose}>Cancel</button>
                    <button type='submit' className='sqr-btn del-btn' >Delete</button>
                </div>
            </form>
        </div>
    ) : "";
}

export default ProfilePopUp