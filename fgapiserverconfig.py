#!/usr/bin/env python
# Copyright (c) 2015:
# Istituto Nazionale di Fisica Nucleare (INFN), Italy
# Consorzio COMETA (COMETA), Italy
#
# See http://www.infn.it and and http://www.consorzio-cometa.it for details on
# the copyright holders.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import os
import random
import string
import json
import ConfigParser

__author__ = "Riccardo Bruno"
__copyright__ = "2015"
__license__ = "Apache"
__version__ = "v0.0.7-1"
__maintainer__ = "Riccardo Bruno"
__email__ = "riccardo.bruno@ct.infn.it"

# GridEngine API Server configuration


class FGApiServerConfig:

    def_api_ver = '1.0'
    def_fg_ver = '0.0.71'

    # Default values; used when conf file does not exists
    # or an option is missing on configuration file
    # the use of default values is notified by the
    # class variable fgConfigMsg
    defaults = {
        'fgapiserver': {
            'fgapiver': def_api_ver,
            'fgapiserver_name': ('GridEngine API Server % s'
                                 % def_fg_ver),
            'fgapisrv_host': 'localhost',
            'fgapisrv_port': '8888',
            'fgapisrv_debug': 'True',
            'fgapisrv_iosandbox': '/tmp',
            'fgapisrv_geappid': '10000',
            'fgjson_indent': '4',
            'fgapisrv_key': '',
            'fgapisrv_crt': '',
            'fgapisrv_logcfg': 'fgapiserver_log.conf',
            'fgapisrv_dbver': '',
            'fgapisrv_secret': '0123456789ABCDEF',
            'fgapisrv_notoken': 'False',
            'fgapisrv_notokenusr': 'futuregateway',
            'fgapisrv_lnkptvflag': 'False',
            'fgapisrv_ptvendpoint': 'http://localhost/ptv',
            'fgapisrv_ptvuser': 'ptvuser',
            'fgapisrv_ptvpass': 'ptvpass',
            'fgapisrv_ptvdefusr': 'futuregateway',
            'fgapisrv_ptvdefgrp': 'administrator',
            'fgapisrv_ptvmapfile': 'fgapiserver_ptvmap.json'},
        'fgapiserver_db': {
            'fgapisrv_db_host': 'localhost',
            'fgapisrv_db_port': '3306',
            'fgapisrv_db_user': 'localhost',
            'fgapisrv_db_pass': 'fgapiserver_password',
            'fgapisrv_db_name': 'fgapiserver'}
    }

    # Configuration values
    fgConfig = {}

    # Configuration messages informs about the loading
    # of configuration values
    fgConfigMsg = "Configuration messages ...\n"

    def __init__(self, config_file):
        """
          Initialize the configutation object loading the given
          configuration file
        """

        # Parse configuration file
        config = ConfigParser.ConfigParser()
        if config.read(config_file) == []:
            self.fgConfigMsg += (
                "[WARNING]: Couldn't find configuration file '%s'; "
                " default options will be uses\n" % config_file)

        # Load configuration
        for section in self.defaults.keys():
            for conf_name in self.defaults[section].keys():
                def_value = self.defaults[section][conf_name]
                try:
                    self.fgConfig[conf_name] = config.get(section, conf_name)
                except:
                    self.fgConfigMsg += ("[WARNING]:Couldn't find option '%s' "
                                         "in section '%s'; "
                                         "using default value '%s'"
                                         % (conf_name, section, def_value))
                # The use of environment varialbes override any default or
                # configuration setting present in the configuration file
                try:
                   env_value = os.environ[conf_name.upper()]
                   self.fgConfigMsg += ("Environment bypass of '%s': '%s' <- '%s'\n"
                                        % (conf_name, self.fgConfig[conf_name], env_value))
                   self.fgConfig[conf_name] = env_value
                except KeyError:
                   pass

        # Show configuration in Msg variable
        if self.fgConfig['fgapisrv_debug'] == 'True':
            self.fgConfigMsg += self.show_conf()

    def show_conf(self):
        """
          Show the loaded APIServer fron-end configuration
        :return:
        """
        return ("FutureGateway API Server config\n"
                "----------------------------------\n"
                "%s\n" % json.dumps(self.fgConfig,
                                    indent=int(
                                        self.fgConfig['fgjson_indent'])))

    def config(self, fg_config):
        """
          Load configuration from a given dictionary
        """
        for key in fg_config:
            val = fg_config[key]
            # Assign key, val into fgConfig
            for section in self.fgConfig.keys():
                for conf_name in self.fgConfig[section].keys():
                    if conf_name == key:
                        self.fgConfig[section][key] = value
                        break

    def get_config(self):
        """
         This function returns the object containing loaded configuration
         settings
        :return: the object containing configuration settings
        """
        return self.fgConfig

    def get_messages(self):
        """
          Return the messages created during configuration loading
        """
        return self.fgConfigMsg
