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
const Gio = imports.gi.Gio

const TEST_BOOLEAN = 'test-boolean';
const ONLY_LOCAL = 'local';

const HelloWorld = new Lang.Class({
	Name: 'Application',

	// create application
	_init: function() {
		print("_init()\n"); // DELETE
		this.application = new Gtk.Application();

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
		print("_on_activate(): \n"); // DELETE
		this._window.show_all();
	},

	_on_startup: function() {
		print("_on_startup(): \n"); // DELETE
		this._build_ui();
		this._json_data.get_config_dir();
	},
	
	get_settings: function() {
		print("settings 00");
		let schema_name = 'org.gnome.gtatoo';
		//let schema_dir = extension.dir.get_child('schemas').get_path();
		let schema_dir = "schemas/"

		// Extension installed in .local
		if (GLib.file_test(schema_dir + '/gschemas.compiled', GLib.FileTest.EXISTS)) {
			print("settings 20");
			let schema_source = Gio.SettingsSchemaSource.new_from_directory(schema_dir,
				Gio.SettingsSchemaSource.get_default(), false);
			let schema = schema_source.lookup(schema_name, false);

			return new Gio.Settings({settings_schema: schema});
		} else {
			print("settings 30");
			if (Gio.Settings.list_schemas().indexOf(schema_name) == -1)
				throw "Schema \"%s\" not found.".format(schema_name);
			return new Gio.Settings({schema: schema_name});
		}

	}

})

let app = new HelloWorld();

// settings
let settings = app.get_settings();
print("Status of test setting: " + settings.get_boolean(TEST_BOOLEAN));
settings.set_boolean(TEST_BOOLEAN, ! settings.get_boolean(TEST_BOOLEAN));
print("Status of test setting: " + settings.get_boolean(TEST_BOOLEAN));

app.application.run(ARGV);
