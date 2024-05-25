class Requests {
    constructor() {}

    async fetchData(url, form = undefined, userData = undefined) {
        try {
            const res = userData
                ? await fetch(url, {
                      method: "POST",
                      body: this._creatingFormData(form, userData),
                  })
                : await fetch(url);

            if (!res.ok) throw new Error(`Something went wrong. Status: ${res.status}`);
            return await res.json();
        } catch (e) {
            throw e;
        }
    }

    _creatingFormData(form, obj) {
        let formData = "";
        if (obj) {
            formData = new FormData(form);
            for (let key in obj) {
                formData.set(key, obj[key]);
            }
        } else {
            formData = new FormData(form);
        }
        return formData;
    }
}

export default new Requests();
