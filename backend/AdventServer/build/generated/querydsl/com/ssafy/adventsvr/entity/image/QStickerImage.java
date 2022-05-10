package com.ssafy.adventsvr.entity.image;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QStickerImage is a Querydsl query type for StickerImage
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStickerImage extends EntityPathBase<StickerImage> {

    private static final long serialVersionUID = 2004723262L;

    public static final QStickerImage stickerImage = new QStickerImage("stickerImage");

    public final NumberPath<Integer> category = createNumber("category", Integer.class);

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final StringPath image = createString("image");

    public QStickerImage(String variable) {
        super(StickerImage.class, forVariable(variable));
    }

    public QStickerImage(Path<? extends StickerImage> path) {
        super(path.getType(), path.getMetadata());
    }

    public QStickerImage(PathMetadata metadata) {
        super(StickerImage.class, metadata);
    }

}

