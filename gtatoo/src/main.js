#!/usr/bin/gjs
/* -*- Mode: javascript; indent-tabs-mode: nil; c-basic-offset: 4; tab-width: 4 -*-  */
/*
 * main.js
 * Copyright (C) 2017 Michael Ott <kc.videri@gmail.com>
 *
 * gtatoo is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the
 * Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * gtatoo is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License along
 * with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

const GLib = imports.gi.GLib
const Lang = imports.lang;
const Gtk = imports.gi.Gtk;
const LocalData = imports.localdata;
const Settings = imports.settings;

const HelloWorld = new Lang.Class({
	Name: 'Application',

	// create application
	_init: function() {
		print("_init()"); // DELETE
		this.application = new Gtk.Application();

		this._settings = new Settings.Settings();
		print("Status of test setting: " + this._settings.is_test());
		this._settings.set_test(! this._settings.is_test());
		print("Status of test setting: " + this._settings.is_test());

		// currently only the local JSON data works
		this._json_data = new LocalData.LocalJsonData();
		this._json_data.get_config_dir();

		// connect the activate and startup signal to handlers
		this.application.connect('activate',
			Lang.bind(this, this._on_activate));
		this.application.connect('startup',
			Lang.bind(this, this._on_startup));
	},

	_build_ui: function() {
		this._window = new Gtk.ApplicationWindow({
			application: this.application,
			title: "Hello World!",
		});
		this._window.set_default_size(200, 200);
		this.label = new Gtk.Label({
			label: "Hello World",
		});
		this._window.add(this.label);
	},

	_on_activate: function() {
		// show the window and all children
		print("_on_activate(): "); // DELETE
		this._window.show_all();
	},

	_on_startup: function() {
		print("_on_startup(): "); // DELETE
		this._build_ui();
		this._json_data.get_config_dir();
	},
	
})

let app = new HelloWorld();

// settings
/*
let settings = app.get_settings();
print("Status of test setting: " + settings.get_boolean(TEST_BOOLEAN));
settings.set_boolean(TEST_BOOLEAN, ! settings.get_boolean(TEST_BOOLEAN));
print("Status of test setting: " + settings.get_boolean(TEST_BOOLEAN));
*/

app.application.run(ARGV);
