import React, {useState} from 'react';

function Formulario() {

    // state del Componente
    // busqueda = state, guardarBusqueda = this.setState({})
    const [busqueda, guardarBusqueda] = useState(
        {
            ciudad : '',
            pais : ''
        }
    )

    const handleChange = e => {
        //Cambiar el state
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })

    }

    return(
        <form>
            <div className="input-field col s12">
                <input
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    onChange={handleChange}
                />
                <label htmlFor="ciudad">Ciudad: </label>
            </div>

            <div className="input-field col s12">
                <select onChange={handleChange} name="pais">
                    <option value="">Seleccione un país</option>
                    <option value="VE">Venezuela</option>
                    <option value="CH">Chile</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="ES">España</option>
                </select>
            </div>

            <div className="input-field col s12">
                <input type="submit" className="waves-effect waves-light btn-block btn-large yellow accent-4"
                value="Buscar Clima"/>
            </div>

        </form>
    )
}

export default Formulario;