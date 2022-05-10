package com.ssafy.adventsvr.entity.image;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QBackgroundImage is a Querydsl query type for BackgroundImage
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBackgroundImage extends EntityPathBase<BackgroundImage> {

    private static final long serialVersionUID = -1663482707L;

    public static final QBackgroundImage backgroundImage = new QBackgroundImage("backgroundImage");

    public final NumberPath<Integer> category = createNumber("category", Integer.class);

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final StringPath image = createString("image");

    public QBackgroundImage(String variable) {
        super(BackgroundImage.class, forVariable(variable));
    }

    public QBackgroundImage(Path<? extends BackgroundImage> path) {
        super(path.getType(), path.getMetadata());
    }

    public QBackgroundImage(PathMetadata metadata) {
        super(BackgroundImage.class, metadata);
    }

}

