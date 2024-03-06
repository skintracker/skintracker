{ pkgs ? import <nixpkgs> { } }:

pkgs.mkShell {
  packages = with pkgs; [
    bun
    grass-sass
  ];

  shellHook = ''
    echo "Hi skintracker!"
  '';
}