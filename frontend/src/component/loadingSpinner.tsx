import { Icon } from "semantic-ui-react"
import styles from "../../styles/loading/spinner.module.css"

const LoadingSpinner = () => {
    return (
        <div className={ styles.alignment }>
            <Icon 
                loading size='massive' 
                color='teal' 
                name='spinner'
            />
        </div>
    )
}

export default LoadingSpinner
