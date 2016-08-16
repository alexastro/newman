var _ = require('lodash');


module.exports = {
    /**
     * Processes a request body and puts it in a format compatible with
     * the "request" library.
     *
     * Original method was overrided to support base64 encoded content
     *
     * @param request
     */
    getRequestBody: function (request) {
        var options,
            mode = _.get(request, 'body.mode'),
            body = _.get(request, 'body'),
            empty = request.body && request.body.isEmpty && request.body.isEmpty(),
            content;

        if (empty || !mode || !body[mode]) {
            return;
        }

        content = body[mode];

        if (_.isFunction(content.all)) {
            content = content.all();
        }
console.log(body, request);
        if (mode === 'raw') {

            if (encoded == 'base64') {
                // use Buffer to send file content!
                options = {body: new Buffer(content, "base64")};
            }
            else {
                options = {body: content};
            }
        }
        else if (mode === 'urlencoded') {
            options = {
                form: _.reduce(content, function (accumulator, param) {
                    // This is actually pretty simple,
                    // If the variable already exists in the accumulator, we need to make the value an Array with
                    // all the variable values inside it.
                    if (accumulator[param.key]) {
                        _.isArray(accumulator[param.key]) ? accumulator[param.key].push(param.value) :
                            (accumulator[param.key] = [accumulator[param.key], param.value]);
                    }
                    else {
                        accumulator[param.key] = param.value;
                    }
                    return accumulator;
                }, {})
            };
        }
        else if (request.body.mode === 'formdata') {
            options = {
                formData: _.reduce(content, function (accumulator, param) {
                    // This is actually pretty simple,
                    // If the variable already exists in the accumulator, we need to make the value an Array with
                    // all the variable values inside it.
                    if (accumulator[param.key]) {
                        _.isArray(accumulator[param.key]) ? accumulator[param.key].push(param.value) :
                            (accumulator[param.key] = [accumulator[param.key], param.value]);
                    }
                    else {
                        accumulator[param.key] = param.value;
                    }
                    return accumulator;
                }, {})
            };
        }
        else if (request.body.mode === 'file') {
            options = {
                body: _.get(request, 'body.file.content')
            };
        }
        return options;
    }
}