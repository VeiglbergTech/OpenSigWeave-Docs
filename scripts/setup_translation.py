#!/usr/bin/env python3
"""Install the freely licensed en→de Argos model for offline static translation.

This only runs while preparing a build, not when a visitor browses the website.
"""
import argostranslate.package
import argostranslate.translate

if not any(l.code == 'en' and any(t.to_lang.code == 'de' for t in l.translations) for l in argostranslate.translate.get_installed_languages()):
    argostranslate.package.update_package_index()
    packages = argostranslate.package.get_available_packages()
    pair = next((p for p in packages if p.from_code == 'en' and p.to_code == 'de'), None)
    if pair is None:
        raise SystemExit('No en→de package in the Argos package index')
    argostranslate.package.install_from_path(pair.download())
print('Offline Argos English → German translation model ready')
