if [ -f "pzk-schema.ts" ]; then
    rm pzk-schema.ts
fi

if [ -f "pzk-schema.js" ]; then
    rm pzk-schema.js
fi

if [ -d "pzk-model" ]; then
    rm -rf pzk-model
fi

flatc --ts pzk-schema.fbs
./tsc pzk-model/p-model.ts
find . -name "*.ts" |xargs rm -rfv
# cp -r /home/pengzhikang/下载/flatbuffers-master/ts/* pzk-model/
# tsc pzk-schema.ts
