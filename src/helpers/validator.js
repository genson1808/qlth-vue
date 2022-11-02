export function validatePhone(input) {
  var validRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  if (input.match(validRegex)) {
    return true;
  } else {
    return false;
  }
}

export function validateEmail(input) {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (input.match(validRegex)) {
    return true;
  } else {
    return false;
  }
}

// rules: phone, email, required
export function validate(rules, val) {
  var errors = [];
  if (rules.includes("required")) {
    if (!val) {
      errors.push("Dữ liệu không được bỏ trống.");
    }
  }

  if (rules.includes("phone")) {
    if (val && !validatePhone(val)) {
      errors.push("Số điện thoại không hợp lệ");
    }
  }

  if (rules.includes("email")) {
    if (val && !validateEmail(val)) {
      errors.push("Email không hợp lệ");
    }
  }

  return errors;
}
