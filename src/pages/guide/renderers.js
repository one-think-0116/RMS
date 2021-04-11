import * as React from 'react';

export class Renderers {
    constructor(enterEdit, exitEdit, editFieldName) {
        this.enterEdit = enterEdit;
        this.exitEdit = exitEdit;
        this.editFieldName = editFieldName;
    }

    cellRender = (tdElement, cellProps) => {
        const dataItem = cellProps.dataItem;
        const cellField = cellProps.field;
        const inEditField = dataItem[this.editFieldName];
        const additionalProps = cellField && cellField === inEditField ?
            {
                ref: (td) => {
                    const input = td && td.querySelector('input');
                    const activeElement = document.activeElement;

                    if (!input ||
                        !activeElement ||
                        input === activeElement ||
                        !activeElement.contains(input)) {
                        return;
                    }

                    if (input.type === 'checkbox') {
                        input.focus();
                    } else {
                        input.select();
                    }
                },
                onKeyDown: (e) => { this.handleKeyDown(dataItem, e); }
            } : {
                onDoubleClick: () => { this.enterEdit(dataItem, cellField); },
                onKeyDown: (e) => { this.handleKeyDown(dataItem, e); }
            };
        return React.cloneElement(tdElement, { ...tdElement.props, ...additionalProps }, tdElement.props.children);
    }
    handleKeyDown = (dataItem, e) => {
        if (e.keyCode === 13) {
            this.exitEdit();
        }
    }
    rowRender = (trElement) => {
        const trProps = {
            ...trElement.props,
            onMouseDown: () => {
                this.preventExit = true;
                clearTimeout(this.preventExitTimeout);
                this.preventExitTimeout = setTimeout(() => { this.preventExit = undefined; });
            },
            onBlur: () => {
                clearTimeout(this.blurTimeout);
                if (!this.preventExit) {
                    this.blurTimeout = setTimeout(() => { this.exitEdit(); });
                }
            },
            onFocus: () => { clearTimeout(this.blurTimeout); }
        };
        return React.cloneElement(trElement, { ...trProps }, trElement.props.children);
    }
}