import { Nav } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { PlaceholderPage } from '../../pages/placeholder/placeholder'
import { _DetailPage } from '../../pages/_DetailPage'

@Injectable()
export class NavigatorProvider {

    _masterNav: Nav = null
    _detailNav: Nav = null
    _isOn: boolean = false
    constructor() {
    }

    get masterNav(): Nav {
        return this._masterNav
    }

    set masterNav(value: Nav) {
        this._masterNav = value
    }

    get detailNav(): Nav {
        return this._detailNav
    }

    set detailNav(value: Nav) {
        this._detailNav = value
    }

    get isOn(): boolean {
        return this._isOn
    }

    set isOn(value: boolean) {
        this._isOn = value
    }

    pushMaster(page: any, params: any) {
        this.masterNav.push(page, params);
    }

    pushDetail(page: any, params: any) {
        if (this.isOn) {
            this.detailNav.setRoot(page, params);
        } else {
            this.masterNav.push(page, params);
        }
    }

    onSplitPaneChanged(isOn) {
        try {
            // set local 'isOn' flag...
            this.isOn = isOn;
            // if the nav controllers have been instantiated...
            if (this.masterNav && this.detailNav) {
                (isOn) ? this.activateSplitView() :
                    this.deactivateSplitView();
            }
        } catch (err) {
            console.log(err)
        }
    }

    activateSplitView() {
        if (this.masterNav == null) return
        let currentView = this.masterNav.getActive();
        if (currentView.component.prototype instanceof _DetailPage) {
            // if the current view is a 'Detail' page...
            // - remove it from the 'master' nav stack...
            this.masterNav.pop();
            // - and add it to the 'detail' nav stack...
            this.detailNav.setRoot(currentView.component, currentView.data);
        }
    }

    deactivateSplitView() {
        if (this.detailNav == null) return
        let detailView = this.detailNav.getActive();
        this.detailNav.setRoot(PlaceholderPage);
        if (detailView.component.prototype instanceof _DetailPage) {
            // if the current detail view is a 'Detail' page...
            // ...so, not the placeholder page:
            let index = this.masterNav.getViews().length;
            // add it to the master view...
            this.masterNav.insert(index, detailView.component, detailView.data);
        }
    }


}
