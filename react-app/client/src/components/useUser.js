import { useCallback, useContext, useState } from 'react'
import Context from './UserContext'
import loginService from './api/login'

export default function useUser() {
    const { jwt, setJWT } = useContext(Context)
    const [state, setState] = useState({ loading: false, error: false })

    const login = useCallback(({email, password}) => {
        setState({loading: true, error: false})
        loginService({email, password})
        .then(jwt => {
            setState({loading: false, error: false})
            setJWT(jwt)
        })
        .catch(error => {
            setState({loading: false, error: true})
            console.error(error)
        })
    }, [setJWT])

    const logout = useCallback(() => {
        setJWT(null)
    }, [setJWT])

    return {
        isLoginLoading: state.loading,
        isLoginError: state.error,
        isLogged: Boolean(jwt),
        login,
        logout
    }
} 