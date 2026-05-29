
import '../config.css'

function Appearance() {
    return (
        <>
            <div className="content-div">
                <form action="">
                    <h2 className='title-div'>Tema</h2>
                    <div className="check">
                        <div className="sub-check">
                            <input type="radio" className='radio'/>
                            <label htmlFor="" className='label-tema'>Dark</label>
                        </div>
                        <div className="sub-check">
                            <input type="radio" className='radio'/>
                            <label htmlFor="" className='label-tema'>Light</label>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Appearance