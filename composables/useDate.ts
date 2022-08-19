export async function useDate() {
  var date: any = new Date();
  var dd = String(date.getDate()).padStart(2, "0");
  var mm = String(date.getMonth() + 1).padStart(2, "0");
  var yyyy = date.getFullYear();
  return (date = yyyy + "-" + mm + "-" + dd);
}
