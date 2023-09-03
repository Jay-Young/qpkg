{
  "targets": [
    {
      "target_name": "winregistry",
      "conditions": [
        ['OS=="win"', {
          "sources": [
            "src/winregistry.cc"
          ],
          "msvs_configuration_attributes": {
            "SpectreMitigation": "Spectre"
          },
          "msvs_settings": {
            "VCCLCompilerTool": {
              "AdditionalOptions": [
                "/guard:cf",
                "/we4244",
                "/we4267",
                "/ZH:SHA_256"
              ]
            },
            "VCLinkerTool": {
              "AdditionalOptions": [
                "/guard:cf"
              ]
            }
          },
        }]
      ]
    }
  ]
}
