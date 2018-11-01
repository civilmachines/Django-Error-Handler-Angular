public handleError(error: HttpErrorResponse) {
  switch (error.status) {
    case 400: {
      if (error.error.data) {
      this.message = [error.error.data.message];
      } else {
        for (const x in error.error) {
          if (error.error.hasOwnProperty(x)) {
            this.message.push(x + ': ' + error.error[x][0]);
          }
        }
      }
      break;
    }
    case 403: {
      // TODO: Clear local storage. Redirect to loginpage
      this.message = ['You are not logged in or the token has expired. Please login again!'];
      break;
    }
    case 404: {
      this.message = [error.error.data.message];
      break;
    }
    case 422: {
      this.message = ['Improper data sent!'];
      for (const x in error.error.data) {
        if (error.error.data.hasOwnProperty(x)) {
          this.message.push(x + ': ' + error.error.data[x][0]);
        }
      }
      break;
    }
    case 429: {
      this.message = ['Too many request'];
      break;
    }
    case 500: {
      this.message = ['A server side error occurred. Please report this to info@vitartha.com'];
      break;
    }
    case 504: {
      this.message = ['Gateway timeout, Please check your internet connection!'];
      break;
    }
    case 0: {
      this.message = ['Please check your internet connection!'];
      break;
    }
    default: {
      this.message = [error.error];
      break;
    }
  }
  return throwError(this.message);
}
