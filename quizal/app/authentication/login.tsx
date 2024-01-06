const token = "Token " + "IvYZvalqpcSW34sQywUHBJPrVBC3OG1W";
const headers = { Authorization: token, "Content-Type": "application/json" };

export async function login(email: string, password: string) {
  fetch(
    `https://api.baserow.io/api/database/rows/table/232140/?filter__email__equal=${email}&user_field_names=true`,
    {
      headers: headers,
      method: "GET",
    },
  )
    .then((response) => response.json())
    .then((data) => console.log(data));
}
