function getDateNow() {
  const fechaActual = new Date();

  // Obtiene la hora, los minutos y los segundos
  const horas = fechaActual.getHours();
  const minutos = fechaActual.getMinutes();
  const segundos = fechaActual.getSeconds();

  // Obtiene el día, el mes y el año
  const dia = fechaActual.getDate();
  const mes = fechaActual.getMonth() + 1; // Los meses en JavaScript son indexados desde 0
  const año = fechaActual.getFullYear();

  // Formatea la fecha y la hora según tus necesidades
  const fechaFormateada = `${horas}:${minutos}:${segundos} ${dia}/${mes}/${año}`;

  return fechaFormateada;
}

function getDateSpecial() {
  const fechaActual = new Date();

  // Obtiene la hora, los minutos y los segundos
  const horas = fechaActual.getHours();
  const minutos = fechaActual.getMinutes();
  const segundos = fechaActual.getSeconds();

  // Obtiene el día, el mes y el año
  const dia = fechaActual.getDate();
  const mes = fechaActual.getMonth() + 1; // Los meses en JavaScript son indexados desde 0
  const año = fechaActual.getFullYear();

  // Formatea la fecha y la hora según tus necesidades
  const fechaFormateada = `${dia}${mes}${año}-${horas}${minutos}`;
  return fechaFormateada;
}

export { getDateNow, getDateSpecial };
