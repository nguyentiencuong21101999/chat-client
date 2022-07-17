
import './style.css'

import Button from '../../../core/button';
import Login from '../login/component';
function ChatView(props) {
  const { ui } = props
  return (
    <div className="home">
      <div className="home-bar">
        {ui.modulesList.map(e =>
        (
          <div className='bar-detail'>
            <p className='bar-name'>{e.name}</p>
            {e.childModulesList.map(e => (
              <div className='childModules' >
                <div className='childModules_name'>{e.name}</div>
                <div className='childModules_params'>  <Login /></div>
                <div className='childModules_submit'>
                  <p>M : {e.method}</p>
                  <div className='childModules_submit_btn' >
                    <Button
                      style={{ fontSize: "20px" }}
                      type="button"
                      text="submit"
                      onClick={(e) => {
                        e.preventDefault();

                      }}
                    />
                  </div>
                </div>
              </div>
            ))}

          </div>)
        )}
      </div>
      <div className="home-response">
        <div className='response'>

        </div>
      </div>
    </div>
  )
}
export default ChatView;
