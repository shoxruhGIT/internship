const Input = ({ label, state, setState }) => {
  return (
    <div class="form-floating">
      <input
        type="text"
        class="form-control"
        id="floatingInput"
        placeholder={label}
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      <label htmlFor="floatingInput">{label}</label>
    </div>
  );
};

export default Input;
