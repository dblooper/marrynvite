import React from 'react'
import Form from '../form/Form';
import classes from './Menu.module.css'

const Menu = (props) => {
    return(
        <Form title="Menu na przyjęciu">
            <div>
                <input type="radio" id="menu-simple" name="menu" value="vegan"></input>
                <label for="menu-simple">Standardowe</label>
            </div>
            <div>
                <input type="radio" id="menu-vege" name="menu" value="vegetarian"></input>
                <label for="menu-vege">Wegetariańskie</label>
            </div>
            <div>
                <input type="radio" id="menu-vega" name="menu" value="standard"></input>
                <label for="menu-vega">Wegańskie</label>
            </div>
        </Form>
    )
}

export default Menu;