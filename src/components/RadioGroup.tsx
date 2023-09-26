export interface RadioItem {
    name: string,
    value: string,
}

export const RectangleRadioGroup = (Props: {Items: RadioItem[], onChangeHandler: any, checkedValue: string, classname: string }) => {
    return (
        <div className="grid grid-cols-5 gap-4">
            {Props.Items.map((item)=>(
                <div key={item.name} className={Props.classname}>
                    <input type="radio" id={item.name} name={"rect_radio"} value={item.value} className="hidden peer" required 
                        onClick={()=>{Props.onChangeHandler(item.value);}}
                        defaultChecked={item.value===Props.checkedValue}
                    />
                    <label htmlFor={item.name} 
                        className={`inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border 
                            border-gray-200 cursor-pointer dark:hover:text-gray-300 
                            dark:border-gray-700 dark:peer-checked:text-blue-500 
                            peer-checked:bg-blue-600 peer-checked:text-white 
                            hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 
                            dark:bg-gray-800 dark:hover:bg-gray-700
                        `}>                           
                        <div className="block w-full">
                            <div className="w-full text-lg font-semibold text-center">{item.name}</div>
                        </div>
                    </label>
                </div>
            ))}
        </div>
    )
}

export const RectangleRadioGroup_1 = (Props: {Items: RadioItem[], onChangeHandler: any, checkedValue: string, classname: string }) => {
    return (
        <div className="flex flex-wrap gap-2 justify-between w-full">
            {Props.Items.map((item)=>(
                <div key={item.name} className={Props.classname}>
                    <input type="radio" id={item.name} name={"rect_radio"} value={item.value} className="hidden peer" required 
                        onClick={()=>{Props.onChangeHandler(item.value);}}
                        defaultChecked={item.value===Props.checkedValue}
                    />
                    <label htmlFor={item.name} 
                        className={`inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border 
                            border-gray-200 cursor-pointer dark:hover:text-gray-300 
                            dark:border-gray-700 dark:peer-checked:text-blue-500 
                            peer-checked:bg-blue-600 peer-checked:text-white 
                            hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 
                            dark:bg-gray-800 dark:hover:bg-gray-700
                        `}>                           
                        <div className="block w-full">
                            <div className="w-full text-lg font-semibold text-center">{item.name}</div>
                        </div>
                    </label>
                </div>
            ))}
        </div>
    )
}