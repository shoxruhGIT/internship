const Input = ({ label, state, setState }) => {
  return (
    <div>
      <input
        type="text"
        class="form-control"
        id="floatingInput"
        placeholder={label}
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  );
};

export default Input;
