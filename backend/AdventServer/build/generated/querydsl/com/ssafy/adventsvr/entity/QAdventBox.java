package com.ssafy.adventsvr.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAdventBox is a Querydsl query type for AdventBox
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAdventBox extends EntityPathBase<AdventBox> {

    private static final long serialVersionUID = -1736309178L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAdventBox adventBox = new QAdventBox("adventBox");

    public final QBaseTimeEntity _super = new QBaseTimeEntity(this);

    public final DatePath<java.time.LocalDate> activeAt = createDate("activeAt", java.time.LocalDate.class);

    public final NumberPath<Integer> activeDay = createNumber("activeDay", Integer.class);

    public final QAdvent advent;

    public final NumberPath<Integer> adventDay = createNumber("adventDay", Integer.class);

    public final StringPath animation = createString("animation");

    public final StringPath content = createString("content");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createAt = _super.createAt;

    public final StringPath id = createString("id");

    public final BooleanPath isActive = createBoolean("isActive");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    public final StringPath wrapper = createString("wrapper");

    public QAdventBox(String variable) {
        this(AdventBox.class, forVariable(variable), INITS);
    }

    public QAdventBox(Path<? extends AdventBox> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAdventBox(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAdventBox(PathMetadata metadata, PathInits inits) {
        this(AdventBox.class, metadata, inits);
    }

    public QAdventBox(Class<? extends AdventBox> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.advent = inits.isInitialized("advent") ? new QAdvent(forProperty("advent")) : null;
    }

}

