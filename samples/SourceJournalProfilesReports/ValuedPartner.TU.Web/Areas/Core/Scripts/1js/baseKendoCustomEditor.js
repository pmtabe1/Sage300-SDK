/* Copyright (c) 1994-2022 Sage Software, Inc.  All rights reserved. */

(function () {
    'use strict';

    let baseKendoCustomEditorObject = {
        /**
         * Kendo grid custome editors template. Finder, datepicker, nuemric, dropdown list and Yes/No editors
         * @param {any} container Kendo editor container
         * @param {any} options Kendo editor options
         */
        customTemplate: function (container, options) {
            if (!container[0].id) {
                return;
            }
            //By default. all finder editors should always use upper case class, if not need set options.upperCase = false
            const isUpperCase = options.ShowfinderIcon && options.upperCase === undefined || options.upperCase;
            options.upperCase = isUpperCase;
            options.class = isUpperCase ? 'txt-upper' : '';
            options.model.class = options.class;

            const guid = kendo.guid();
            //Total grid, use mappedField to get field name
            const field = options.model.mappedField || options.field;
            let dataType = options.dataType || (options.model[field] && options.model[field].dataType) || 'Text';
            options.dataType = dataType;
            
            const className = this.getTemplateClass(options) ||'';
            const maxLength = options.maxLength || 32;
            const fmtTextbox = options.formattextbox || '';

            let value = options.model[field];
            if (apputils.isObject(value)) {
                value = value.value;
                let hasUpperClass = options.model && options.model.class && options.model.class.includes('txt-upper');
                value = hasUpperClass ? value.toUpperCase() : value;
            }
            const html = `<input class="${className}" id="${guid}" name="${options.field}" type="text" value="${value}" maxlength="${maxLength}" formattextbox="${fmtTextbox}" />`;

            if (options.formatList || (options.model[field] && options.model[field].formatList)) {
                dataType = 'DropdownList'
            }

            $('#lnkHasDetailOptionalFields').prop('disabled', options.field !== 'HASOPT')

            const numArray = ['Decimal', 'Long', 'Int', 'Integer', 'Amount', 'Number'];

            if (numArray.includes(dataType)) {
                this.numericEditor(container, options, dataType, html);

            } else if (dataType === 'DateTime' || dataType === 'Date') {
                this.dateEditor(container, options, html, guid);

            } else if (dataType === 'DropdownList') {
                //const div = `<div id="${guid}" name="${options.field}" />`;
                this.dropdownEditor(container, options, html, value, guid);

            } else if (dataType === 'Yes/No' || dataType === 'YesNo') {

                this.yesNoEditor(container, options, html);
            } else {

                $(html).appendTo(container, options);
            }

            let changeHandler = function (data) {
                $("#" + guid).off("change", changeHandler);

                let hasUpperClass = options.model.class && options.model.class.includes('txt-upper');
                let value = data.currentTarget.value;
                let msgId = options.customMessage ? options.customMessage : options.model.RowIndex + options.field;
                let msgName = options.viewId + msgId + apputils.EventMsgTags.usrUpdate;

                value = hasUpperClass ? value.toUpperCase() : value;
                let msgData = { viewId: options.viewId, rowIndex: options.model.RowIndex, field: options.field, value: value, prevValue: options.model[options.field], customBinding: options.customBinding };

                MessageBus.msg.trigger(msgName, msgData);
            }

            let changeHandler2 = function (data) {
                $("#" + guid).off("change", changeHandler2);

                if (window.activeElementId && window.activeElementId.includes(data.currentTarget.id)) {
                    window.activeElementId = '';
                    return;
                }
                const model = options.model;
                const field = options.field;
                //const preValue = model[field];
                let value = data.currentTarget.value;
                let hasUpperClass = (model.class && model.class.includes('txt-upper')) || (options.className && options.className.includes('txt-upper'));

                value = hasUpperClass ? value.toUpperCase() : value;
                model.set(field, value);

                let prefix = apputils.isUndefined(model.prefixNamespace) ? "" : model.prefixNamespace;
                let msg = prefix + options.viewId + model.msgid + field + apputils.EventMsgTags.usrUpdate;

                if (options.ShowfinderIcon || options.finderType) {
                    msg = prefix + options.viewId + options.finderType;
                }
                //[RC] 2/25 - setCellFocus makes to tab twice before moving to next cell. Please discuss with me to fix.
                MessageBus.msg.trigger(msg, { nav: "user", viewId: options.viewId, msgid: model.msgid, rowIndex: model.RowIndex, field: field, value: value, callback: setCellFocus });
            }

            if (options.customMessage || options.customBinding) {
                $("#" + guid).on("change", changeHandler);
            } else if (options.customEventBinding) {
                //TODO:
            } else {
               $("#" + guid).on("change", changeHandler2);
            }

            //Set finder
            let finderHtml = this.showIcon(guid, options, container);

            //[RC] - 3/4 changed here 

            if (finderHtml.length > 0) {
                let id = guid + 'finderIcon';
                let property = options.property ?? options.model.property;

                $('#' + id).mousedown((e) => {
                    if (e.currentTarget) {
                        window.activeElementId = e.currentTarget.id;
                    }

                    //grid with finder inputs always uppercase except set options.upperCase as false
                    let inputInitValue = options.upperCase ? $('#' + guid).val().toUpperCase() : $('#' + guid).val();
                    $('#' + guid).val(inputInitValue);

                    //Set finder init input values
                    let initValues = property.initKeyValues;
                    if (initValues && initValues.length > 0) {
                        let lastValue = initValues[initValues.length - 1];
                        if (lastValue !== inputInitValue) {
                            initValues[initValues.length - 1] = inputInitValue;
                        }
                    }

                    //Launch grid finders
                    sg.viewFinderHelper.setViewFinderEx(id, guid, property, function (data) {
                        let model = options.model;
                        let field = options.field;
                        let value = data[Object.keys(data)[0]];

                        if (property.callback && apputils.isFunction(property.callback)) {
                            $(document).on("click", ".msgCtrl-close", () => property.callback());
                        };

                        //Select value not changed, no need trigger change message. See:AT-78637
                        if (model[field] === value) {
                            return;
                        }

                        model.set(field, value);

                        if (model.customMessage) {
                            const cusmsg = options.viewId + model.customMessage + apputils.EventMsgTags.usrUpdate;
                            field = model.mappedField ?? field;
                            data.customMessage = model.customMessage;
                            MessageBus.msg.trigger(cusmsg, { viewId: options.viewId, rowIndex: model.rowIndex.value, field: field, value: value, customBinding: options.customBinding, row: data });
                            return;
                        }

                        let prefix = apputils.isUndefined(model.prefixNamespace) ? "" : model.prefixNamespace;
                        let msg = prefix + options.viewId + options.finderType;

                        //nav = system means value is coming from finder, add row to pass more fields(finder select row return data)
                        let valueField = options.model.mappedField || field; //Finder select field name may different than view field name.
                        let fieldValue = data[valueField] || data[field] || value;

                        MessageBus.msg.trigger(msg, { nav: "system", viewId: options.viewId, msgid: model.msgid, rowIndex: model.RowIndex, field: field, value: fieldValue, row: data });
                    },
                    // Cancel
                    function (e) {
                        let field = options.field;
                        if (typeof options.model[field] === 'string' && options.upperCase) {
                            options.model.set(field, options.model[field].toUpperCase());
                        }
                        setCellFocus();
                    });
                });

            }

            //Used in finder cancel button click and error message popup close, set focus back to current edit cell
            function setCellFocus() {
                //[RC] - 2/27 - why we need this. Please discuss with me.
                //const colIndex = GridPreferencesHelper.getGridColumnIndex(grid, options.field);
                //const cell = grid.tbody.find("tr").eq(rowIndex).find("td").eq(colIndex);
                //grid.editCell(cell);
            };
        },

        /**
         * Get template class based on field type
         * @param {any} options Kendo options
         */
        getTemplateClass: function (options) {
            let dataType = options.dataType || '';
            switch (dataType.toLowerCase()) {
                case "char":
                case "text":
                    return options.class;
                case ("date"):
                    return "";
                case ("decimal"):
                case ("long"):
                case ("int"):
                    return "numeric pr25 valid";
                default: {
                    const css = options.defaultCss || "";
                    return options.model.class ? `${options.model.class} ${css}` : css;
                }
            }
        },

        /**
         * Show editor icon, finder or pencil edit icon
         * @param {any} guid Kendo grid editor textbox id
         * @param {any} options Kendo grid editor options
         * @param {any} container Kendo grid editor container
         */
        showIcon: function (guid, options, container) {
            if (options.ShowfinderIcon || options.model.ShowfinderIcon) {
                let id = guid + 'finderIcon';
                $('<input ' + '" id="' + id + '" class="icon btn-search" tabindex="-1" type="button" />').appendTo(container);
                let html = `<input id="${id}" class="icon btn-search" tabindex="-1" type="button" />`;
                return html;
            }

            if (options.ShowPencilIcon || options.model.ShowPencilIcon) {
                let id = guid + 'pencilIcon';
                $('<input ' + '" id="' + id + '" class="icon pencil-edit right" tabindex="-1" type="button" />').appendTo(container);
                let html = `<input id="${id}" class="icon pencil-edit right" tabindex="-1" type="button" />`;
                return html;
            }

            return "";
        },

        /**
         * Dete picker editor
         * @param {any} container Kendo grid editor container
         * @param {any} options Kendo grid editor options
         * @param {any} html Html elements string
         * @param {any} textId Html textbox id
         */
        dateEditor: function (container, options, html, textId) {
            const value = options.model[options.field] || '';
            options.model.VALUE = value.length === 8 ? kendo.parseDate(value.toString(), 'yyyyMMdd') : value;
            html = '<div class="edit-container"><div class="edit-cell inpt-text">' + html + '</div>';

            $(html).appendTo(container);
            sg.utls.kndoUI.datePicker(textId);
        },

        /**
         * Dropdown list editor
         * @param {any} container Kendo grid editor container
         * @param {any} options Kendo grid editor options
         * @param {any} html Html elements string
         */
        dropdownEditor: function (container, options, html, value, guid) {
            $(html).appendTo(container)
                .kendoDropDownList({
                    dataSource: options.formatList,
                    change: function (e) {
                        $(e.sender.element).trigger('change');
                    }
                });

            let dropDownList = $("#" + guid).data("kendoDropDownList");
            if (dropDownList) {
                dropDownList.select((dataItem) => {
                    return dataItem === value;
                });
            }

        },

        /**
         * Yes/No dropdown list editor
         * @param {any} container Kendo grid editor container
         * @param {any} options Kendo grid editor options
         * @param {any} html Html elements string
         */
        yesNoEditor: function (container, options, html) {
            let value = options.model[options.field].trim();
            options.model[options.field] = value;
            $(html).appendTo(container)
                .kendoDropDownList({
                    dataTextField: "text",
                    dataValueField: "value",
                    dataSource: [
                        { text: globalResource.No, value: '0' },
                        { text: globalResource.Yes, value: '1' }
                    ],
                    change: function (e) {
                    }
                });
        },

        /**
         * Textbox control editor
         * @param {any} container Kendo grid editor container
         * @param {any} options Kendo grid editor options
         */
        textEditor: function (container, options) {
            $('<input type="text" name="' + options.field + '"/>')
                .addClass('k-textbox')
                .appendTo(container)
                .blur(function (e) {
                    if (e.originalEvent.target.value) {
                        options.model.set("result", 1);
                    } else {
                        options.model.set("result", null);
                    }
                })
        },
        /**
         * Kendo Numeric textbox editor
         * @param {any} container Kendo grid editor container
         * @param {any} options Kendo grid editor options
         * @param {any} dataType Field data type
         * @param {any} html Html elements string
         */
        numericEditor: function (container, options, dataType, html) {
            const s = kendo.culture().numberFormat['.'];
            let maxLength = 16;
            let factor = 1;
            let format = 'n3';
            let max = 0, min = 0;
            let precision = apputils.isUndefined(options.precision) ? 3 : options.precision;

            ////////////////
            let value = options.model[options.field];

            if (apputils.isUndefined(value) || apputils.isNull(value)) {
                return;
            }

            //convert to string to find precision
            if (value && apputils.isNumber(value)) {
                value = value + "";
            }

            if (apputils.isUndefined(options.precision) && value && value.includes(s)) {
                value = options.model[options.field].split(s);
                if (value.length > 1) {
                    precision = value[1].length;
                }
            }
            let size = options.length || options.model[options.field].length;

            //value & size
            //////////////////////

            switch (dataType) {
                case "Int":
                    min = -32768;
                    max = 32767;
                    maxLength = 5;
                    precision = 0;
                    break;
                case "Long":
                    min = -2147483648;
                    max = 2147483647;
                    maxLength = 10;
                    precision = 0;
                    break;
                case "Decimal":
                    max = Math.pow(10, size * 2) - 1;
                    min = apputils.isUndefined(options.minValue) ? - 1 * max : options.minValue;
                    maxLength = 2 * size;
                    if (maxLength > 16) {
                        maxLength = 16;
                    }

                    break;
                default:
            }

            format = `n${precision}`;

            if (options.model.isPercent) {
                format = "p0";
                factor = 100;
                min = 0;
                max = 100;
            }

            const txtNumeric = $(html).appendTo(container).kendoNumericTextBox({
                format: format,
                factor: factor,
                spinners: false,
                min: min,
                max: max,
                decimals: precision
            });

            let numberOfNumerals = maxLength > precision ? maxLength - precision : 0;
            numberOfNumerals = numberOfNumerals < 10 ? 10 : numberOfNumerals;
            sg.utls.kndoUI.restrictDecimals(txtNumeric, precision, numberOfNumerals);
        },

    }

    this.baseKendoStaticCustomEditor = helpers.View.extend({}, baseKendoCustomEditorObject);

}).call(this); //make the call to bind the extended object