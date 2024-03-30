type inputProps = {
   id: string;
   placeholder: string;
}

const CustomTextInput: React.FC<inputProps> = async ({ id, placeholder }) => {
   return(
      <input 
         className="placeholder:text-xs placeholder:text-gray-400 border p-3 my-3 rounded-md border-gray-500 outline-black" 
         type="text" 
         name={id} 
         id={ id } 
         placeholder={ placeholder }
      />
   )
}
export default CustomTextInput;