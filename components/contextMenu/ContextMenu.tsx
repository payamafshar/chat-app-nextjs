import React, { useEffect, useRef } from "react"
import { Location } from "../messages/ConversationMessage"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { toggleContextMenu } from "../../store/messageContainerSlice"



const ContextMenu = () => {

    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const handleClick = () => dispatch(toggleContextMenu(false));
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
      }, []);

    const elemRef = useRef(null)

    const { points} = useSelector((state:RootState)=> state.messageContainer)
    return <div ref={elemRef} style={{ left: points.x, top:points.y }} className={`bg-blackSmooth z-50 flex flex-col justify-start items-start rounded-md w-36 h-28 px-4 fixed `}>
        <ul className="flex flex-col justify-center  items-start py-4">
            <li className="text-white px-1 min-w-full font-semibold py-2  rounded-md hover:text-textInner">
                Delete
            </li>
            <li className="text-white px-1 py-2 font-semibold rounded-md hover:text-textInner">Edit</li>
        </ul>
    </div>
}


export default ContextMenu