import { useState, forwardRef, useImperativeHandle } from 'react'

const TogglableComponent = forwardRef((props, refs) => {
    //forwardRef permite monitorear Componente
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    //Permite a Componente Padre ejecutar funcipn retornada
    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <button className="toggableButtonGreen text-white" onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button className="toggableButtonRed text-white" onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )

})
TogglableComponent.displayName = 'Togglable'

export default TogglableComponent