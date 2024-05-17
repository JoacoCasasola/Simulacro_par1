class Registro {
  constructor(id, titulo, vende, alquila, puertas, kms, potencia, aclaracion) {
    this.id = id;
    this.titulo = titulo;
    this.vende = vende;
    this.alquila = alquila;
    this.puertas = +puertas;
    this.kms = +kms;
    this.potencia = +potencia;
    this.aclaracion = aclaracion;
  }

  verify() {
    const errors = [];
    errors.push(this.checkTitulo());
    errors.push(this.checkPuertas());
    errors.push(this.checkKms());
    errors.push(this.checkPotencia());
  
    // Filtra los errores para eliminar los valores nulos
    const filteredErrors = errors.filter(error => error !== null);
    
    if (filteredErrors.length === 0) {
      return { success: true, rta: null };
    } 
    else {
      filteredErrors.forEach(error => {
        alert(error.message);
      });
      return { success: false, rta: null };
    }
  }

  checkTitulo() {
    for (let i = 0; i < this.titulo.length; i++) {
      if(!isNaN(this.titulo[i])) {
        return { success: false, message: 'El título es inválido' };
      }
    }
    return null;
  }

  checkPuertas() {
    if (isNaN(this.puertas) || this.puertas < 0) {
      return { success: false, message: 'El número de puertas es inválido' };
    }
    return null;
  }

  checkKms() {
    if (isNaN(this.kms) || this.kms < 0) {
      return { success: false, message: 'Los kilómetros son inválidos' };
    }
    return null;
  }

  checkPotencia() {
    if (isNaN(this.potencia) || this.potencia <= 0) {
      return { success: false, message: 'La potencia es inválida' };
    }
    return null;
  }
}

export { Registro };