import React from "react";
import ReactSlider from 'react-slider';
export default function SliderComponent(){
    const [value, setValue] = React.useState([20, 80]);
    return(
        <div width="100px">
        <ReactSlider
       value={value}
    onBeforeChange={(value, index) =>
        console.log(`onBeforeChange: ${JSON.stringify({ value, index })}`)
    }
    onChange={(value, index) => console.log(`onChange: ${JSON.stringify({ value, index })}`)}
    onAfterChange={(value, index) =>
        console.log(`onAfterChange: ${JSON.stringify({ value, index })}`)
    }
    className="horizontal-slider"
    thumbClassName="example-thumb"
    trackClassName="example-track"
    renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
      />
        </div>
    )
}