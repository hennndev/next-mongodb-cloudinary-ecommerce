

const SizeForm = ({valSize, handleChange}) => {

    return (
        <select className='px-2 py-1 rounded border border-gray-300 outline-none focus:bg-blue-50' value={valSize} onChange={handleChange}>
            <option value="36">36</option>
            <option value="37">37</option>
            <option value="38">38</option>
            <option value="39">39</option>
            <option value="40">40</option>
            <option value="41">41</option>
            <option value="42">42</option>
            <option value="43">43</option>
            <option value="44">44</option>
            <option value="45">45</option>
            <option value="46">46</option>
            <option value="47">47</option>
        </select>
    )
}

export default SizeForm
