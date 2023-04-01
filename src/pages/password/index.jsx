import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useState } from 'react'
import PageHeader from "../../components/ui/PageHeader"
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const Password = () => {
    const {changePassword} = useStoreActions(state => state.auth)
    const {error, isLoading, message} = useStoreState(state => state.auth)
    const [data, setData] = useState({currentPassword: '', password: '', passwordConfirmation: ''})

    const handleChange = (e) => {
        setData(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = () => {
        changePassword(data)
    }

    useEffect(() => {
        if(message?.status === 202) {
            toast.success(message.msg, {
                position: "bottom-left",
                autoClose: 2000
            })

            // Reset data
            setData({currentPassword: '', password: '', passwordConfirmation: ''})
        }
    }, [message])

    useEffect(() => {
        if(message.status === 200) {
            setData({currentPassword: '', password: '', passwordConfirmation: ''})
        }
    }, [isLoading])
    return (
        <>
            <PageHeader title="Change Password" />
            <Box>
                <TextField
                    label="Current Password"
                    type="password"
                    fullWidth
                    placeholder='Your current password'
                    name='currentPassword'
                    sx={{my: 1}}
                    value={data.currentPassword}
                    onChange={handleChange}
                    error={Boolean(error.currentPassword)}
                    helperText={error?.currentPassword?.msg || error?.currentPassword?.msg}
                />
                <TextField
                    label="New Password"
                    type="password"
                    fullWidth
                    placeholder='Your new password'
                    name='password'
                    sx={{my: 1}}
                    value={data.password}
                    onChange={handleChange}
                    error={Boolean(error.password)}
                    helperText={error?.password?.msg || error?.password?.msg}
                />
                <TextField
                    label="Confirmation Password"
                    type="password"
                    fullWidth
                    placeholder='Your confirmation password'
                    name='passwordConfirmation'
                    sx={{my: 1}}
                    value={data.passwordConfirmation}
                    onChange={handleChange}
                    error={Boolean(error.passwordConfirmation)}
                    helperText={error?.passwordConfirmation?.msg || error?.passwordConfirmation?.msg}
                />
            </Box>
            <Button onClick={handleSubmit} variant="contained">Save</Button>
        </>
    )
}

export default Password